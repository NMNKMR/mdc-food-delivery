# NutriGo

A healthy-food delivery app built with **Expo** and **React Native**. Browse
curated healthy restaurants, explore menus, build a cart, and track orders —
all behind a simulated authentication flow.

This is an assignment project. The navigation layer is built **entirely on
React Navigation** (no Expo Router).

## Demo Video -> https://drive.google.com/file/d/1RBUoPGcj0OoXEyVMECkM_n7ImofGYejG/view?usp=sharing
## Screenshots:
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/f1aa4dbd-8b05-41a7-8dc7-66c1af912e16" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/4a7e3b18-e5b1-4101-8f92-f4f05c1233f3" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/4b4f7708-6fbc-4eb4-ace5-e8ac13cb8c2a" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/11babdd1-98ad-46f6-bb76-5727937f14cc" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/bec1e15f-d676-443d-acb8-7e66c412964f" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/6757ab76-19c6-425b-a9fb-feba2f7dd257" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/59d4645e-3235-48ac-be0c-04e40dd083b2" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/0c995e51-e5b4-4c82-9544-6b2f2e506926" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/020cca38-0f90-4f2d-a4f6-56a3b13564aa" />
<img width="250" height="480" alt="image" src="https://github.com/user-attachments/assets/5078a2c4-89de-41ff-9283-1ee951832ea2" />

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Expo SDK ~55, React Native 0.83.6, React 19.2.0 |
| Language | TypeScript ~5.9 (strict mode) |
| Navigation | React Navigation v7 — native-stack, bottom-tabs, drawer |
| State | Zustand v5 (`authStore`, `cartStore`) |
| Persistence | `@react-native-async-storage/async-storage` (via Zustand `persist`) |
| Animation | `react-native-reanimated` v4 + `react-native-worklets` |
| Gestures | `react-native-gesture-handler` (drawer dependency) |
| Misc | `expo-linear-gradient`, `expo-status-bar`, `expo-linking`, `@expo/vector-icons` |
| Theming | Custom light/dark theme context (`context/ThemeProvider`) |

---

## How to run locally

**Prerequisites:** Node.js (LTS), npm, and either the **Expo Go** app or a
**development build** on a device/emulator.

```bash
# 1. Install dependencies
npm install

# 2. Start the Metro dev server
npx expo start
```

Then:

- press `a` to open on **Android**
- press `i` to open on **iOS**
- press `w` to open on **web**

> **Deep links:** The custom `nutrigo://` scheme requires a **development
> build** (`npx expo run:android` / `npx expo run:ios`). In **Expo Go**, deep
> links resolve through the `exp://…/--/` form — the `Linking.createURL()`
> prefix handles this automatically.

---

## Navigation structure

The whole app lives inside a single `NavigationContainer`. `RootNavigator`
**conditionally renders** the auth flow or the app flow based on
`useAuthStore` — there is no wrapping root navigator with named routes.

```
NavigationContainer  (RootNavigator)
│
├─ hasHydrated === false ──▶ Splash (ActivityIndicator)
│
├─ isLoggedIn === false ──▶ AuthNavigator        [native-stack]
│                            ├─ Onboarding   (initial route)
│                            ├─ SignUp
│                            └─ SignIn
│
└─ isLoggedIn === true  ──▶ AppNavigator         [native-stack]
                             │
                             ├─ MainTabs ───────▶ TabsNavigator   [bottom-tabs]
                             │                     ├─ Home
                             │                     ├─ Search
                             │                     └─ Orders   (badge: active orders)
                             │                     └─ Profile  (custom tab-bar button →
                             │                                  pushes ProfileArea)
                             │
                             ├─ ProfileArea ────▶ ProfileNavigator [drawer]
                             │                     ├─ ProfileMain  ("My Account")
                             │                     ├─ MyOrders     (redirects to Orders tab)
                             │                     ├─ HelpCenter
                             │                     └─ Settings
                             │
                             ├─ RestaurantDetail  { restaurantId }
                             └─ Cart
```

Key points:

- **`RootNavigator`** waits for the persisted auth store to hydrate
  (`hasHydrated`) before deciding which flow to mount, showing a splash spinner
  meanwhile.
- **Profile** is *not* a bottom tab. The custom `TabBar` renders Profile as its
  own button that pushes the `ProfileArea` route on the app stack, so the
  drawer is available **only inside the profile area** and the tab bar is
  hidden there.
- **`MyOrders`** is registered as a `Drawer.Screen` so it keeps its position in
  the drawer list, but its component renders nothing — a `drawerItemPress`
  listener intercepts the tap and navigates to the `Orders` tab on the outer
  stack instead.
- Param lists are defined in [`src/navigation/types.ts`](src/navigation/types.ts).

---

## Deep linking setup

A custom URL scheme is registered and wired into React Navigation.

**1. URL scheme** — declared in [`app.json`](app.json):

```json
{ "expo": { "scheme": "nutrigo" } }
```

**2. Linking config** — [`src/navigation/linking.ts`](src/navigation/linking.ts)
is passed to `NavigationContainer` via the `linking` prop (with a `fallback`
splash while the initial URL resolves):

```ts
prefixes: [Linking.createURL("/"), "nutrigo://", "https://nutrigo.app"]
```

**Path map:**

| URL | Destination |
| --- | --- |
| `nutrigo://welcome` | Onboarding |
| `nutrigo://signup` | Sign Up |
| `nutrigo://signin` | Sign In |
| `nutrigo://home` | Home tab |
| `nutrigo://search` | Search tab |
| `nutrigo://orders` | Orders tab |
| `nutrigo://account` | Profile (drawer) |
| `nutrigo://help` | Help Center |
| `nutrigo://settings` | Settings |
| `nutrigo://restaurant/:restaurantId` | Restaurant Detail (e.g. `restaurant/r1`) |
| `nutrigo://cart` | Cart |

**Testing a deep link** (development build):

```bash
npx uri-scheme open "nutrigo://restaurant/r1" --android
npx uri-scheme open "nutrigo://restaurant/r1" --ios
```

> **Auth gating:** Because `RootNavigator` mounts only one navigator at a time,
> app links (`home`, `restaurant/...`, `cart`, etc.) resolve **only when signed
> in**, and auth links (`welcome`, `signin`, `signup`) resolve **only when
> signed out**. A link that doesn't match the currently mounted navigator is
> ignored.

---

## Assumptions made

This is an assignment build, so several areas are intentionally scoped down:

- **Authentication is simulated.** There is no backend. `signUp` / `signIn`
  run against an in-memory `users` array with a ~1.5s fake network delay. Only
  the *session flag* (`isLoggedIn`) and current user are persisted to
  AsyncStorage — registered users are **not** persisted, so they reset on a
  full reload. Email is optional and editable from the profile.
- **Search & filtering are not implemented.** The Search screen and the home
  category row are UI placeholders — they do not actually query or filter the
  restaurant data.
- **Orders use dummy data.** Active and past orders come from static arrays in
  [`constants/data.ts`](constants/data.ts). There is no real order placement,
  status updates, or history.
- **Profile area is mostly static.** Quick actions (Saved Address, Payment
  Methods, Notifications, Promotions), Help Center, and Settings are empty /
  non-functional pages and links — the working control there is the theme
  toggle.
- **Deep linking is navigator-scoped** (see note above): links only resolve for
  the flow that is currently mounted.
- **Content is mock data.** Restaurants, menus, images, and prices (in ₹) are
  bundled locally; no remote API is called.
