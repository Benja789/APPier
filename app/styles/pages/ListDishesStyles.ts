import { StyleSheet } from "react-native";
import { Colors } from "../Colors";

export const ListDishesStyles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: "row"
    },
    dishesContainer: {
        flex: 0.7,
    },
    detailsContainer: {
        flex: 0.3,
        borderLeftWidth: 1,
        borderLeftColor: Colors.border,
    },
    row: {
        flex: 1,
        justifyContent: "space-around"
    },
    gridItem: {
        flex: 1,
        margin: 10,
        maxWidth: "23%", // Ajusta el ancho máximo de cada elemento
    },

    // Card de los dishes
    cardDishContainer: { 
        alignItems: "center",
        justifyContent: "center",
    },
    baseCard: {
        minHeight: 210,
    }
})