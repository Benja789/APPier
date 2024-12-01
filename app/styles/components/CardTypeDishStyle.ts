import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const CardTypeDishStyle = StyleSheet.create({
    icon:{
        width: 40,
        height: 40
    },
    card: {
        height: 80,
        width: 180,
    },
    contentCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10
    },
    selected: {
        borderColor: Colors.primary,
        borderWidth: 2
    }
})