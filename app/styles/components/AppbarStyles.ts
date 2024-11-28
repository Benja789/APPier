import { StyleSheet } from "react-native";

export const AppbarStyles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text:{ 
        fontSize: 22,
        flex: 0.8
    },
    containerIcon: {
        flexDirection: 'row',
        gap: 10
    }
})