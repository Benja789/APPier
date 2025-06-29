import { Image, Text, TouchableOpacity, View } from "react-native";
import { BaseStyles } from "../../styles/BaseStyles";
import { CardTableStyle } from "../../styles/components/CardTableStyle";

interface ICardTableProps {
    table: any;
    callBack: () => void;
}

const CardTable = ( props: ICardTableProps ) => {
    const { table, callBack } = props
    return (
        <TouchableOpacity onPress={callBack}>
            <View style={[ BaseStyles.cardContainer, CardTableStyle.container, BaseStyles.shadow ]}>
                <View style={[ BaseStyles.cardContent, CardTableStyle.containerIcon ]}>
                    <View style={[ CardTableStyle.detailsTable ]}>
                        <Image 
                            style={[ CardTableStyle.icon ]}
                            source={require("../../assets/icons/restaurante.png")}/>
                        <View>
                            <View style={ CardTableStyle.titleHeader }>
                                <View style={[ CardTableStyle.viewContainer, ( table?.enabled ? CardTableStyle.viewAvailable : CardTableStyle.viewOcuped ) ]}/>
                                <View>
                                    <Text style={[BaseStyles.textTitleH2, { padding: 0, margin: 0 }]}>
                                        Mesa { table.table?.tableNumSeats ?? "-" }
                                    </Text>
                                    <Text style={[BaseStyles.textP, ( table?.enabled ? CardTableStyle.textAvailable : CardTableStyle.textOcuped ) ]}>
                                        { table?.labelStatus ?? "-" }
                                    </Text>
                                </View>
                            </View>
                            <Text style={[BaseStyles.textP, { textAlign: 'center' }]}>
                                Mesa para { table?.table?.tableNumSeats ?? 1 } personas
                            </Text>
                        </View>
                    </View>
                    <Image 
                        style={[ CardTableStyle.iconAction ]}
                        source={require("../../assets/icons/arrow-right.png")}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardTable;