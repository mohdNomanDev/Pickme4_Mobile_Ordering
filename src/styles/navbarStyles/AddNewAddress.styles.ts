import { StyleSheet, Platform } from 'react-native';
import { Spacing } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.xxl,
    maxWidth: 720,      // Limits width on large web monitors for better readability
    width: '100%',
    alignSelf: 'center', // Centers the form on web
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    marginBottom: 32,
  },
  formGrid: {
    gap: 16, // Clean spacing between form elements
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to next line on very small screens
    justifyContent: 'space-between',
    gap: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
    minWidth: '45%', // Ensures fields sit side-by-side but stack if screen is too narrow
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    borderRadius: 12,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'web' ? 14 : 16,
    fontSize: 15,
    outlineStyle: 'none', // Removes default web focus ring
  } as any,
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    marginTop: 8,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingBottom: 40,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 100, // Pill shape for a premium feel
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
