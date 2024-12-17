import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { Modal, Text, TextInput, TouchableHighlight, View } from "react-native";
import { BaseStyles } from "../../styles/BaseStyles";
import IconButton from "../Base/IconButton";
import { ModalAddDishStyles } from "../../styles/components/ModalAddDishStyles";
import Button from "../Base/Button";
import { DishAddedStyles } from "../../styles/components/DishAddedStyles";
import { AppContextProvider } from "../../interfaces/IAppContext";

interface IModalAddDish {
    open: boolean;
    setOpen: (open: boolean) => void;
    dish: any
    setDish: Dispatch<SetStateAction<any>>
}
const ModalAddDish = (props: IModalAddDish) => {
    const { open, dish, setOpen, setDish } = props;
    const appContext = useContext(AppContextProvider)
    const [dishFind, setDishFind] = useState<any>({})
    const [dishOptions, setDishOptions] = useState<any>({
        type: "",
        notes: "",
        extras: []
    })
    const [messageError, setMessageError] = useState<any>({
        type: "",
        notes: "",
        extras: ""
    })

    useEffect(()=>{
        if ( open ) {
            let dishFind = appContext.order?.products?.find((item:any)=> item.uid === dish.uid)
            if ( dishFind?.status !== "delivered" ) {
                setDishFind(dishFind)
                setDishOptions({
                    type: dishFind?.type ?? "",
                    notes: dishFind?.notes ?? "",
                    extras: dishFind?.extras ?? []
                })
            } else {
                setDishOptions({
                    type: "",
                    notes: "",
                    extras: []
                })
            }
        }
    }, [open])

    // Metodo para cerrar el modal
    const closeModal = () => {
        setOpen(false)
        setDishOptions({
            type: "",
            notes: "",
            extras: []
        })
        setMessageError({
            type: "",
            notes: "",
            extras: ""
        })
        setDish({})
    }

    // Metodo para cambiar el tipo de plato
    const changeOrderDish = (type: string) => {
        setMessageError((prev:any)=>({
            ...prev,
            type: ""
        }))
        setDishOptions({
            ...dishOptions,
            type: type
        })
    }

    // Metodo para cambiar las cantidades de los platos
    const changeQuantity = (type: '-' | '+') => {
        setDish((prev:any)=>{
            let quantity = prev.quantity
            if (type === '+') quantity++
            else quantity--

            if ( quantity == 0 ) {
                appContext.deleteDish(prev)
                closeModal()
                return {}
            } else {
                return {
                    ...prev,
                    totalLine: Math.round((prev.price * quantity) * 100) / 100,
                    quantity: quantity
                }
            }
        })
    }

    // Metodo para guardar el dish en el arreglo
    const saveDish = () => {
        if ( dish.fatherCategory !== "drinks" && dishOptions.type === "" ) {
            setMessageError({
                ...messageError,
                type: "Debes seleccionar el tipo de plato"
            })
            return
        }
        if ( dishFind !== undefined ) {
            appContext.setDish({
                ...dish,
                ...dishOptions
            })
        } else {
            appContext.addDish({
                ...dish,
                canEdit: true,
                status: "edition",
                ...dishOptions
            })
        }
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
                        <Text style={[BaseStyles.textTitleH2]}>Plato: { dish?.name ?? "" }</Text>
                        <Text style={[BaseStyles.textP]}>$ { appContext.formatedPrice(dish?.price ?? 0) }</Text>
                    </View>
                    <IconButton
                        callBack={closeModal}
                        icon={require("../../assets/icons/close.png")} />
                </View>
                < View style={[BaseStyles.divider]} />
                {
                    dish.fatherCategory !== "drinks" &&
                    <View>
                        <Text style={[BaseStyles.textP]}>En que orden deseas recibirlo: </Text>
                        <View style={[ModalAddDishStyles.containerOrder]}>
                            <TouchableHighlight
                                style={[ModalAddDishStyles.buttonOrder, (dishOptions.type === 'entrance') ? ModalAddDishStyles.optionSelected : {}]}
                                underlayColor='rgba(0, 0, 0, 0.1)' // Color gris claro con opacidad
                                onPress={() => changeOrderDish('entrance')}>
                                <Text style={[BaseStyles.textTitleH3, (dishOptions.type === 'entrance' ? ModalAddDishStyles.optionSelected : {})]}>Entrada</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={[ModalAddDishStyles.buttonOrder, (dishOptions.type === 'dish') ? ModalAddDishStyles.optionSelected : {}]}
                                underlayColor='rgba(0, 0, 0, 0.1)' // Color gris claro con opacidad
                                onPress={() => changeOrderDish('dish')}>
                                <Text style={[BaseStyles.textTitleH3, (dishOptions.type === 'dish' ? ModalAddDishStyles.optionSelected : {})]}>Plato fuerte</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={[ModalAddDishStyles.buttonOrder, (dishOptions.type === 'dessert') ? ModalAddDishStyles.optionSelected : {}]}
                                underlayColor='rgba(0, 0, 0, 0.1)' // Color gris claro con opacidad
                                onPress={() => changeOrderDish('dessert')}>
                                <Text style={[BaseStyles.textTitleH3, (dishOptions.type === 'dessert' ? ModalAddDishStyles.optionSelected : {})]}>Postre</Text>
                            </TouchableHighlight>

                        </View>
                        {
                            messageError.type !== '' &&
                            <Text style={[BaseStyles.errorMessage, { marginLeft:10, marginTop:10}]}>
                                {messageError.type}
                            </Text>
                        }
                    </View>
                }
                <View style={{ marginVertical: 20 }}>
                    <Text style={[BaseStyles.textP]}>Notas: </Text>
                    <TextInput 
                        style={[BaseStyles.inputText, BaseStyles.multiLineInput]} 
                        value={dishOptions.notes}
                        onChangeText={(e)=>{
                            setDishOptions((prev: any)=>({
                                ...prev,
                                notes: e
                            }))
                        }}/>
                </View>
                <View style={[ModalAddDishStyles.titleModal]}>
                    <View style={[DishAddedStyles.containerButton, { width: "65%", marginTop: 0}]}>
                        <Button
                            text="-"
                            buttonStyle={{ width: 110 }}
                            callBack={() => changeQuantity('-')} />
                        <Text style={[BaseStyles.textTitleH1, { fontSize: 18 }]}>{dish.quantity ?? 0}</Text>
                        <Button
                            text="+"
                            buttonStyle={{ width: 110 }}
                            callBack={() => changeQuantity('+')} />
                    </View>
                    <Button
                        text={`Agregar ($${ appContext.formatedPrice(dish.totalLine ?? 0) ?? "" })`}
                        buttonStyle={{ width: '25%' }}
                        callBack={saveDish} />
                </View>
            </View>
        </Modal>
    )
}

export default ModalAddDish;