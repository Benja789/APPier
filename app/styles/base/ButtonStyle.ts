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
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
    },
    disabled: {
        backgroundColor: Colors.shadowColor
    },
    icon: {
        width: 25,
        height: 25,
    },
    textContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})