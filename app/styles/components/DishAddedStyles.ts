import { StyleSheet } from "react-native";

export const DishAddedStyles = StyleSheet.create({
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginTop: 20
    },
    cardDish: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    notesBox: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderStyle: 'dotted',
    },
    buttonDelete: {
        backgroundColor: '#fce8ea',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 40,
    },
    textButtonDelete: {
        color: '#d8414e'
    }
})