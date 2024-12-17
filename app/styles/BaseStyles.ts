import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const BaseStyles = StyleSheet.create({
    textTitleH1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 26,
        color: Colors.textPrimary
    },
    textTitleH2: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
    },

    textTitleH3: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    textP:{
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    },
    errorMessage: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: Colors.error

    },

    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    body: {
        width: '95%',
        flex: 1,
        marginHorizontal: 'auto',
    },

    textButtonPressable: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        color: Colors.primary
    },

    cardContainer: {
        width: '90%',
        borderRadius: 20,
        // elevation: 2,
    },
    shadow: {
        shadowColor: Colors.shadowColor,
        shadowOffset: {
            width: 2, 
            height: 2, 
        },
        borderWidth: 1,
        borderColor: Colors.border,
        shadowRadius: 3.84, 
        shadowOpacity: 0.01, 
    },
    cardContent: {
        padding: 20,
    },
    cardAction: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputText: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        fontFamily: 'Poppins-Regular'
    },
    multiLineInput: {
        textAlignVertical: "top",
        height: 100,
    },
    divider: {
        marginVertical: 10,
        height: 1,
        width: '100%',
        backgroundColor: Colors.border,
    }, 
    loaderContent: {
        flex: 1,
        justifyContent: 'center',
        margin: 'auto',
        alignItems: 'center',
    },

    blurModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    modalView: {
		backgroundColor: 'white',
		borderRadius:10,
		paddingVertical: 15,
        paddingHorizontal: 20,
        margin: "auto",
        width: "80%",
		shadowColor: Colors.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

    // Boton cancelar
    buttonCancel: {
        backgroundColor: Colors.background,
        borderColor: Colors.primary,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderRadius: 5,
        width: 150,
    },
    textButtonCancel: {
        color: Colors.primary,
        fontFamily: 'Poppins-Bold',
    }
})