import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';

// "DocConnect" wordmark on the left, teal "+" button on the right.
export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Doc<Text style={styles.logoAccent}>Connect</Text>
      </Text>
      <TouchableOpacity style={styles.plusButton} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  logo: { fontFamily: fonts.logo, fontSize: 22, color: colors.logoText },
  logoAccent: { color: colors.tealDark },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
