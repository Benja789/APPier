import { BlurView } from "@react-native-community/blur"
import { Image, Modal, Text, View } from "react-native"
import { BaseStyles } from "../../styles/BaseStyles"
import { useContext } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"
import Button from "./Button"

const ModalConfirmation = () => {
    const appContext = useContext(AppContextProvider)

    const confirmation = () => {
        if ( appContext.modalNotification.callBack ) appContext.modalNotification.callBack()
        closeModal()
    }

    // Metodo para cerrar el modal
    const closeModal = () => {
        appContext.setModalNotification((prev)=>({
            ...prev,
            open: false
        }))
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={appContext.modalNotification.open}
            onRequestClose={closeModal}>
            <BlurView
                style={BaseStyles.blurModal}
                blurType="light"
                blurAmount={1}
                reducedTransparencyFallbackColor="white" />
            <View style={[BaseStyles.modalView, { width: 570} ]}>
                <View style={{ justifyContent: "center", alignItems: "center"}}>
                    {
                        appContext.modalNotification.type === "warning" &&
                            <Image source={require("../../assets/icons/exclamation-triangle.jpg")}/>
                    }
                    <Text style={[BaseStyles.textTitleH1, { textAlign:"center", marginVertical: 20}]}>{ appContext.modalNotification.title}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", width: "100%"}}>
                            <Button
                                text="No, Cancelar"
                                buttonStyle={ BaseStyles.buttonCancel }
                                textStyle={ BaseStyles.textButtonCancel }
                                callBack={closeModal}/>
                            <Button
                                text="Si, Aceptar"
                                buttonStyle={{ width: 150 }}
                                callBack={confirmation}/>
                        </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalConfirmation