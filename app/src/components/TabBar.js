import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Bottom bar from the design: Home, Discover (search) and a paper-plane icon.
// The third icon is chat, which is out of scope for this task, so it does nothing.
const TABS = [
  { key: 'home', icon: 'home', iconOutline: 'home-outline' },
  { key: 'discover', icon: 'search', iconOutline: 'search-outline' },
  { key: 'chat', icon: 'paper-plane', iconOutline: 'paper-plane-outline' },
];

export default function TabBar({ active, onChange }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => tab.key !== 'chat' && onChange(tab.key)}
          >
            <Ionicons
              name={isActive ? tab.icon : tab.iconOutline}
              size={28}
              color={isActive ? colors.tealDark : colors.tabInactive}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
