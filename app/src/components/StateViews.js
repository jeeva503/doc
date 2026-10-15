import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme';

export function LoadingView() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.teal} />
    </View>
  );
}

export function ErrorView({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity style={styles.retry} onPress={onRetry} activeOpacity={0.8}>
        <Text style={styles.retryText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.white },
  errorText: { fontFamily: fonts.regular, fontSize: 16, color: colors.text, textAlign: 'center' },
  retry: { marginTop: 16, paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8, backgroundColor: colors.teal },
  retryText: { fontFamily: fonts.medium, fontSize: 14, color: colors.white },
});
