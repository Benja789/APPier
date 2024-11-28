import { Text, View } from "react-native"
import { BaseStyles } from "../../styles/BaseStyles"
import Button from "../Base/Button"
import { DishAddedStyles } from "../../styles/components/DishAddedStyles"
import IconButton from "../Base/IconButton"
import { useContext } from "react"
import { AppContextProvider } from "../../interfaces/IAppContext"

interface IDishAddedProps {
    dish: any
}

const DishAdded = ( props: IDishAddedProps ) => {
    const { dish } = props
    const appContext = useContext(AppContextProvider)
    return (
        <View style={ DishAddedStyles.cardDish}>
            <View style={[ DishAddedStyles.containerButton ]}>
                <View>
                    <Text style={[BaseStyles.textTitleH3, { fontSize: 13 }]}>{ dish.name ?? ""}</Text>
                    <Text style={[BaseStyles.textP, { fontSize: 12 }]}>{ dish.description ?? "" }</Text>
                    <Text style={[BaseStyles.textP, { fontSize: 12 }]}>${ appContext.formatedPrice(dish.price ?? 0) ?? "" }</Text>
                </View>
                <IconButton
                    icon={require("../../assets/icons/delete.png")}
                    callBack={()=>{}}/>
            </View>
            <View style={[ DishAddedStyles.containerButton ]}>
                <Button 
                    text="-"
                    buttonStyle={{ width: 80 }}
                    callBack={()=>{}}/>
                <Text style={[BaseStyles.textP, { fontSize: 12 }]}>{ dish.quantity ?? 0 }</Text>
                <Button 
                    text="+"
                    buttonStyle={{ width: 80 }}
                    callBack={()=>{}}/>
            </View>
        </View>
    )
}

export default DishAdded