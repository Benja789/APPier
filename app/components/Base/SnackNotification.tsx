import { useContext, useEffect } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"
import { 
    Modal, 
    Platform, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback, 
    Image,
    View 
} from "react-native"
import { BlurView } from "@react-native-community/blur"

const SnackNotification = () => {
    const appContext = useContext(AppContextProvider)

    useEffect(() => {
        if ( appContext.snackNotification?.open ) {
            setTimeout(() => {
                hiddenNotification()
            }, 3000);
        }
    }, [ appContext.snackNotification, appContext.snackNotification?.open ]);

    const hiddenNotification = () => {
        appContext.setSnackNotification((prev)=>({
            ...prev,
            open: false
        }))
        if (appContext.snackNotification.callBack) appContext.snackNotification?.callBack();
    }
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={appContext.snackNotification?.open}
        onRequestClose={() => {
            appContext.setSnackNotification((prev)=>({
                ...prev,
                open: false,
            }))
        }}>
         <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"/>
        <TouchableWithoutFeedback onPress={hiddenNotification}>
            <View style={styles.centeredView}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                            { appContext.snackNotification?.type === "error" && <Image  style={styles.imageStyle} source={ require("../../assets/icons/cancel.png") }/> }
                            { appContext.snackNotification?.type === "info" && <Image  style={styles.imageStyle} source={ require("../../assets/icons/information.png")  }/> }
                            { appContext.snackNotification?.type === "success" && <Image style={styles.imageStyle} source={ require("../../assets/icons/checked.png") }/> }
                            <Text style={styles.message}>{ appContext.snackNotification?.message }</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
    )
}


const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: Platform.OS !== 'ios' ? -40 : 0,
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
    },
    modalView: {
        marginTop: 45, 
        backgroundColor: "white",
        borderRadius: 1,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        shadowColor: "#000",
        // shadowOffset para que la sombra se proyecte hacia abajo
        shadowOffset: {
            width: 0, // Sin desplazamiento horizontal
            height: 5, // Desplazamiento vertical para proyectar la sombra hacia abajo
        },
        shadowOpacity: 0.15, // Controla la transparencia de la sombra
        shadowRadius: 4, // Controla el desenfoque de la sombra
        elevation: 2, // En Android, elevation añade sombra, pero no permite control direccional
        position: 'absolute',
        top: 0, // Asegura que el modal comience desde el tope
        left: 0,
        right: 0
    },
    message: {
        fontSize: 15,
        fontFamily: 'Poppins-ExtraBold',
        color: '#000',
        width: '90%',
    },
    imageStyle: {
        width: 22,
        height: 22
    }
});

export default SnackNotification