import { showMessage } from "react-native-flash-message";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import { PermissionsAndroid } from "react-native";

export const addToAndroidCal = async (
  title,
  startDate,
  endDate,
  location,
  notes
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      {
        title: "Calendar Permission",
        message: "This app needs calendar access to add events",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      showMessage({
        message: "calendar permitted",
        type: "success",
      });
    } else {
      showMessage({
        message: "calendar not permitted",
        type: "warning",
      });
      return; // Exit the function if permission is denied
    }

    const calendarEvent = {
      title: title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      location: location,
      notes,
    };

    AddCalendarEvent.presentEventCreatingDialog(calendarEvent)
      .then((eventInfo) => {
        // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
        // On Android, where they are both equal and represent the event id, also strings.
        // when { action: 'CANCELED' } is returned, the dialog is dismissed
        if (eventInfo.action === "SAVED") {
          showMessage({
            message: "Sumajob",
            description: "Add event to calendar success",
            type: "success",
          });
        }
      })
      .catch((error) => {
        showMessage({
          message: "calendar failed",
          type: "danger",
        });
      });
  } catch (error) {
    console.warn("Error adding event to calendar:", error);
  }
};
