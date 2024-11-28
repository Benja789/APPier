import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const ListDishesStyles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: "row"
    },
    dishesContainer: {
        flex: 0.7,
    },
    detailsContainer: {
        flex: 0.3,
        borderLeftWidth: 1,
        borderLeftColor: Colors.border,
    }
})