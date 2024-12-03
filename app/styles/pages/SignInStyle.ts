import { StyleSheet } from "react-native";

export const SignInStyle = StyleSheet.create({
    iconLogo: {
        width: 200,
        height: 200,
        marginHorizontal: 'auto',
        marginVertical: 60,
    },
    cardSignIn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    formsCode: {
        marginHorizontal: 'auto',
        maxWidth: 600,
    },
    text: {
        textAlign: 'center',
    },
    inputCode: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        width: '90%',
        margin: 'auto'
    },
    footer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'static',
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 120,
        marginHorizontal: 'auto',
    }
})