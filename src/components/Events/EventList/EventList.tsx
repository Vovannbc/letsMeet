import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Collapsible } from "@/components/ui/collapsible";
import useGetMeets from "@/hooks/useGetMeets";

const EventList = () => {
  const { isPending, data } = useGetMeets();

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Event List</ThemedText>
      {isPending && <ThemedText>Loading ...</ThemedText>}
      {!!data?.length &&
        data.map(({ eventName, createdAt }) => (
          <Collapsible key={createdAt} title={eventName}>
            <ThemedText style={styles.text}>{eventName}</ThemedText>
          </Collapsible>
        ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // backgroundColor: "#7e4343",
  },
  text: {
    color: "black",
  },
});

export default EventList;
