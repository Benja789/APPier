import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const ModalBaseStyles = StyleSheet.create({
    blur:{ 
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    modal: {
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 600,
        margin: 'auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
})
