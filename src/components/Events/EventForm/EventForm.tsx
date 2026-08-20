import { ThemedTextInput } from "@/components/themed-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { z } from "zod";
import DatePicker from "@/components/DatePicker";
import { useCreateMeet } from "@/hooks/use-create-meet";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, StyleSheet, Text } from "react-native";
import { Spacing } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";
import { initialEventFormValues } from "@/components/Events/EventForm/constants";

const eventSchema = z.object({
  category: z.string().min(1, "Category is required."),
  eventName: z
    .string()
    .min(1, "Event name is required.")
    .max(50, "Event name must be at most 50 characters."),
  description: z
    .string()
    .max(200, "Description must be at most 200 characters."),
  time: z.date().nullable(),
  people: z
    .number({ error: "Please enter a valid number." })
    .int("Number of people must be a whole number.")
    .min(1, "At least 1 person is required."),
});

type FormValues = z.output<typeof eventSchema>;

const EventForm = ({ initialValues = initialEventFormValues }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialValues,
  });

  const { mutate: createMeet, isPending } = useCreateMeet();

  const onSubmit = (data: FormValues) => {
    createMeet(data, {
      onSuccess: () => {
        reset();
        Alert.alert("Success", "Event created successfully!");
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    });
  };

  return (
    <ThemedView style={styles.formView}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            placeholder="Category"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.field}
          />
        )}
        name="category"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            placeholder="Event Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.field}
          />
        )}
        name="eventName"
      />
      {errors.eventName && (
        <Text style={styles.error}>{errors.eventName.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.field}
          />
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <ThemedTextInput
            placeholder="Number of People"
            onBlur={onBlur}
            onChangeText={(text) => {
              const digits = text.replace(/[^0-9]/g, "");
              onChange(digits === "" ? 0 : Number(digits));
            }}
            value={value === null ? "" : String(value)}
            keyboardType="numeric"
            inputMode="numeric"
            style={styles.field}
          />
        )}
        name="people"
      />
      {errors.people && (
        <Text style={styles.error}>{errors.people.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            title={
              !!value
                ? format(value, "dd MMM yyyy HH:mm", { locale: uk })
                : "Select Date and Time"
            }
            onChange={onChange}
            value={value}
          />
        )}
        name="time"
      />

      <Button
        title={isPending ? "Submitting…" : "Submit"}
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 1,
    color: "#f0eeee",
    borderRadius: 4,
    padding: Spacing.two,
  },
  formView: {
    maxWidth: 600,
    width: "100%",
    marginHorizontal: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: Spacing.three,
  },
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: Spacing.two,
  },
  error: {
    color: "#e53e3e",
    fontSize: 12,
    marginTop: -Spacing.two,
  },
});

export default EventForm;
