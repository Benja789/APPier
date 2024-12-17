import { ScrollView, Text, View } from "react-native"
import { OrderDetailsStyles } from "../../styles/components/OrderDetailsStyles"
import Button from "../Base/Button"
import { BaseStyles } from "../../styles/BaseStyles"
import DishAdded from "./DishAdded"
import { useContext, useEffect } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"
import { apiPostData } from "../../services/api"
import { ENV } from "../../environment/api"
import { useNavigation } from "@react-navigation/native"

interface IOrderDetailsProps {
    loader: boolean
}
const OrderDetails = ( props: IOrderDetailsProps ) => {
    const { loader } = props
    const appContext = useContext(AppContextProvider)
    const navigate = useNavigation<any>()

    useEffect(() => {
    }, [])

    const saveOrder = async() => {
        let body: any = {
            orderId: appContext.order?.id,
            number: appContext.order?.number,
            products: [],
            typeDocument: appContext.order?.typeDocument,
        }

        body.products = appContext.order?.products.map((dish) => ({
                id: dish.id,
                quantity: dish.quantity,
                type: dish.type,
                status: dish.status,
                notes: dish.notes
            }
        ))

        let response = await apiPostData({
            url: ENV.API_URL + ENV.ENDPOINTS.orders,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appContext.user?.token
            },
            body: body,
            setLoader: appContext.setLoader
        })
        console.log(JSON.stringify(response))
        if ( !response.error ) {
            navigate.goBack()
            appContext.setSnackNotification({
                open: true,
                message: response.message ?? "Orden guardada y enviada a cocina.",
                type: "success",
                callBack: () => {
                    appContext.setOrder(null)

                }
            })
        } else {
            appContext.setSnackNotification({
                open: true,
                message: response.message ?? "No se logro guardar la orden.",
                type: "error"
            })
        }
    }
    
    return (
        <View style={ OrderDetailsStyles.container }>
            <Text style={[ BaseStyles.textTitleH1 ]}>Detalles de la orden</Text>
            <ScrollView>
                {
                    appContext.order?.products.map((dish, index) => (
                        <DishAdded 
                            key={index}
                            dish={dish}/>
                    ))
                }
                <View style={{ height: 290}}></View>
            </ScrollView>
            <View style={[ OrderDetailsStyles.buttonContainer ]}>
                <View style={BaseStyles.divider}/>
                <View style={[OrderDetailsStyles.informationDetails, { width:"100%"}]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Subtotal</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>$ { appContext.formatedPrice(appContext.order?.subTotal ?? 0) }</Text>
                </View>

                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Descuento ({ appContext.formatedPrice(appContext.order?.discount ?? 0) }%)</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails, OrderDetailsStyles.textDiscount ]}>$ { appContext.formatedPrice(appContext.order?.discountCash ?? 0) }</Text>
                </View>

                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Subtotal despues del desc.</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>$ { appContext.formatedPrice(appContext.order?.subTotalWithDiscount ?? 0) }</Text>
                </View>     

                {
                    appContext.order?.typeDocument === "IVAEXE" &&
                        <View style={[OrderDetailsStyles.informationDetails]}>
                            <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Impuestos (13%)</Text>
                            <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>$ { appContext.formatedPrice(appContext.order?.taxes ?? 0) }</Text>
                        </View>
                }

                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>Propina ({ appContext.formatedPrice(appContext.order?.tip ?? 0)}%)</Text>
                    <Text style={[ BaseStyles.textP, OrderDetailsStyles.textDetails ]}>$ { appContext.formatedPrice(appContext.order?.tipCash ?? 0) }</Text>
                </View>

                <View style={[OrderDetailsStyles.separatorDotted]}/>
                <View style={[OrderDetailsStyles.informationDetails]}>
                    <Text style={[ BaseStyles.textTitleH3 ]}>Total</Text>
                    <Text style={[ BaseStyles.textTitleH3 ]}>$ { appContext.formatedPrice(appContext.order?.total ?? 0) }</Text>
                </View>
                <Button 
                    text="Guardar"
                    disabled={ loader }
                    buttonStyle={OrderDetailsStyles.button}
                    callBack={saveOrder}/>
            </View>
        </View>
    )
}

export default OrderDetails