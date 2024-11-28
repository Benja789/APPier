import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const CardTableStyle = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
    },
    container: {
        marginVertical: 10, 
        marginHorizontal:'auto'
    },
    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '99%',
        alignItems: 'center',
    },
    iconAction: {
        width: 30,
        height: 30,
    },
    detailsTable: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    titleHeader: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },

    // Iconos de disponibilidad
    viewContainer: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    viewAvailable: {
        backgroundColor: Colors.success,
        color: ''
    },

    viewOcuped: {
        backgroundColor: Colors.error,
        color: '',
        padding: 0,
        margin: 0
    },

    textAvailable: {
        color: Colors.success,
    },
    textOcuped: {
        color: Colors.error,
    }

})