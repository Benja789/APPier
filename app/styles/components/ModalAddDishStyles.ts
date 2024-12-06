import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const ModalAddDishStyles = StyleSheet.create({
    titleModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "99%",
        alignItems: "center",
    },

    containerOrder: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    buttonOrder: {
        width: "30%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border
    },
    optionSelected: {
        backgroundColor: Colors.primary,
        color: "#fff"
    }
})