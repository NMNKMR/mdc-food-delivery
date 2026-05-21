import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../constants/typography";
import { useTheme } from "../../../context/theme";
import {
  AppStackParamList,
  ProfileDrawerParamList,
} from "../../navigation/types";

type Props = CompositeScreenProps<
  DrawerScreenProps<ProfileDrawerParamList, "HelpCenter">,
  NativeStackScreenProps<AppStackParamList>
>;

function HelpCenterScreen(_: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.body}>
        <Text
          style={[
            typography.bodyLg as TextStyle,
            { color: colors.textSecondary },
          ]}
        >
          Help articles and live chat coming soon.
        </Text>
      </View>
    </View>
  );
}

export default HelpCenterScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
});
