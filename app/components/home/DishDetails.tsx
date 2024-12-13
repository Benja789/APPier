import { BlurView } from "@react-native-community/blur"
import { Dispatch, SetStateAction, useContext } from "react"
import { Image, Modal, Text, View } from "react-native"
import { BaseStyles } from "../../styles/BaseStyles"
import { ModalAddDishStyles } from "../../styles/components/ModalAddDishStyles"
import IconButton from "../Base/IconButton"
import { AppContextProvider } from "../../interfaces/IAppContext"
import Button from "../Base/Button"

interface IModalDishDetails {
    dish: any
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    callBackAdd: () => void
}

const ModalDishDetails = ( props: IModalDishDetails ) => {
    const { dish, open, setOpen, callBackAdd } = props
    const appContext = useContext(AppContextProvider)
    
    const closeModal = () => {
        setOpen(false)
    }

    const handleAddDish = () => {
        callBackAdd()
        closeModal()
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={open}
            onRequestClose={closeModal}>
            <BlurView
                style={BaseStyles.blurModal}
                blurType="light"
                blurAmount={1}
                reducedTransparencyFallbackColor="white" />
            <View style={[BaseStyles.modalView]}>
                <View style={[ModalAddDishStyles.titleModal]}>
                    <View>
                        <Text style={[BaseStyles.textTitleH2]}>{ dish?.name ?? "" }</Text>
                        {/* <Text style={[BaseStyles.textP]}>$ { appContext.formatedPrice(dish?.price ?? 0) }</Text> */}
                    </View>
                    <IconButton
                        callBack={closeModal}
                        icon={require("../../assets/icons/close.png")} />
                </View>
                <View style={[BaseStyles.divider]} />
                <View style={{ flexDirection:"row", gap: 30, width:"78%"}}>
                    {
                        (dish.image !== null && dish.image !== undefined && dish.image !== "") ?
                            <Image source={{
                                uri: dish.image
                            }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                            :
                            <Image source={require("../../assets/icons/restaurant.png")} style={{ width: 100, height: 100 }} />
                    }
                    <View>
                        <Text style={[BaseStyles.textP, { textAlign: "justify" }]}>{ dish.description ?? "" }</Text>
                        <Text style={[BaseStyles.textP]}>$ { appContext.formatedPrice(dish?.price ?? 0) }</Text>
                        <Text style={[BaseStyles.textP]}>Disponible: { dish.inventory ?? "-" }</Text>
                        <Button
                            text="Agregar"
                            buttonStyle={{ width: "80%", marginHorizontal: 'auto' }}
                            callBack={handleAddDish} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalDishDetails