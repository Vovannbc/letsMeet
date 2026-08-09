import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Controller, useForm } from 'react-hook-form';

const eventSchema = z.object({
  category: z.string().min(1, 'Category is required.'),
  eventName: z.string().min(1, 'Event name is required.').max(50, 'Event name must be at most 50 characters.'),
  description: z.string().max(200, 'Description must be at most 200 characters.').default(''),
  time: z.date(),
  people: z
    .number({ error: 'Please enter a valid number.' })
    .int('Number of people must be a whole number.')
    .min(1, 'At least 1 person is required.'),
});

type FormValues = z.input<typeof eventSchema>;
type SubmitValues = z.output<typeof eventSchema>;

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    ios: {
      paddingTop: Spacing.six,
      paddingLeft: Spacing.six,
      paddingRight: Spacing.six,
      paddingBottom: Spacing.six,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  const theme = useTheme();

  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      category: '',
      eventName: '',
      description: '',
      time: new Date(),
      people: 0,
    },
  });

  const onSubmit = (data: SubmitValues) => console.log(data);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[contentPlatformStyle, styles.contentContainer]}>
      <ThemedView style={styles.formView}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Event Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.field}
            />
          )}
          name="eventName"
        />
        {errors.eventName && <Text style={styles.error}>{errors.eventName.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.field}
            />
          )}
          name="description"
        />
        {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Number of People"
              onBlur={onBlur}
              onChangeText={(text) => {
                // Strip non-digits, then pass a real number (or NaN) to the form
                const digits = text.replace(/[^0-9]/g, '');
                onChange(digits === '' ? null : Number(digits));
              }}
              value={value === null ? '' : String(value)}
              keyboardType="numeric"
              inputMode="numeric"
              style={styles.field}
            />
          )}
          name="people"
        />
        {errors.people && <Text style={styles.error}>{errors.people.message}</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: Spacing.six,
  },
  formView: {
    maxWidth: 600,
    width: '100%',
    marginHorizontal: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: Spacing.two,
  },
  error: {
    color: '#e53e3e',
    fontSize: 12,
    marginTop: -Spacing.two,
  },
});
