import { BlurView } from "@react-native-community/blur";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Modal, Text, View } from "react-native";
import { BaseStyles } from "../../styles/BaseStyles";
import { AppContextProvider } from "../../interfaces/IAppContext";
import IconButton from "../Base/IconButton";
import { ModalAddDishStyles } from "../../styles/components/ModalAddDishStyles";
import Button from "../Base/Button";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { Colors } from "../../styles/Colors";


const ModalChangeDocument = ( ) => {
    const appContext = useContext(AppContextProvider)
    const [documentSelected, setDocumentSelected] = useState(appContext.order?.typeDocument ?? "TKT")

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: 'COF', 
            label: "Factura de consumidor final",
            value: 'COF',
            color: Colors.primary,
        },{
            id: 'CRF',
            label: "Factura de credito fiscal",
            value: 'CRF',
            color: Colors.primary,
        },{
            id: 'TKT',
            label: "Ticket",
            value: 'TKT',
            color: Colors.primary,
        }, {
            id: 'IVAEXE',
            label: "IVA exento",
            value: 'IVAEXE',
            color: Colors.primary
        }
    ]), []);
    

    useEffect(()=> {
        setDocumentSelected(appContext.order?.typeDocument ?? "TKT")
    }, [appContext.openModalChangeDocument])

    // Metodo para el cambio de tipo de documento
    const handleChangeDocument = (type: any) => {
        setDocumentSelected(type)
    }

    // Metodo para guardar el tipo de documento que se desea facturar
    const saveDocument = () => {
        appContext.setOrder((prev)=> {
            if ( prev && prev !== null ) {
                return {
                    ...prev,
                    typeDocument: documentSelected
                }
            } else return prev
        })
        appContext.calculateTotals()
        closeModal()
    }

    // Metodo para cerrar el modal de facturacion
    const closeModal = () => {
        appContext.setOpenModalChangeDocument(false)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={appContext.openModalChangeDocument}
            onRequestClose={closeModal}>
            <BlurView
                style={BaseStyles.blurModal}
                blurType="light"
                blurAmount={1}
                reducedTransparencyFallbackColor="white" />
            <View style={[BaseStyles.modalView ]}>
                <View style={[ModalAddDishStyles.titleModal]}>
                    <Text style={[BaseStyles.textTitleH2]}>Cambiar el tipo de documento fiscal</Text>
                    <IconButton
                        callBack={closeModal}
                        icon={require("../../assets/icons/close.png")} />
                </View>
                <View style={{ alignItems:"flex-start", justifyContent: "flex-start", width: "100%" }}>
                    <RadioGroup 
                        labelStyle={{
                            fontFamily: "Poppins-Regular", 
                            fontSize: 16,
                            textAlign:"left",
                            alignItems: "flex-start",
                            marginVertical: 10,
                            padding: 10,
                            justifyContent: "flex-start",
                            width: "100%",
                            borderBottomColor: Colors.border,
                            borderBottomWidth: 1,
                        }}
                        containerStyle={{
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            width: "100%",
                        }}
                        radioButtons={radioButtons}
                        onPress={(e:any)=>handleChangeDocument(e)}
                        selectedId={documentSelected} />
                </View>
                <View style={[ModalAddDishStyles.titleModal, { justifyContent: "flex-end" }]}>
                    <Button
                        text="Guardar seleccion"
                        buttonStyle={{ width: 190 }}
                        callBack={saveDocument} />
                </View>
            </View>
        </Modal>
    )
}
export default ModalChangeDocument;