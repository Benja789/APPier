import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const OrderDetailsStyles = StyleSheet.create({
    container: {
        width: '90%',
        flex: 1,
        marginHorizontal: 'auto',
    },
    button: {
        marginHorizontal: 'auto',
        width: '90%',
        marginVertical: 20
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.background
    },
    informationDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textDetails: {
        fontSize: 14
    },
    separatorDotted: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Colors.border,
        marginVertical: 10,
    },
    textDiscount: {
        color: Colors.error
    }
})