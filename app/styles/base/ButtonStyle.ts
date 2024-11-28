import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const ButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    text: {
        color: Colors.buttonText,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
    }
})