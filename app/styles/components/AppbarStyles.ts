import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const AppbarStyles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginHorizontal: 'auto',
    },
    content: {
        backgroundColor: Colors.background,
        minHeight: 60,
    },
    text:{ 
        fontSize: 18,
        flex: 0.8,
        alignItems: 'center',
    },
    containerIcon: {
        flexDirection: 'row',
        gap: 10
    }
})