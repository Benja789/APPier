import { Image, Text, TouchableOpacity, View } from "react-native";
import { BaseStyles } from "../../styles/BaseStyles";
import { CardTableStyle } from "../../styles/components/CardTableStyle";

interface ICardTableProps {
    title: string;
    available: boolean;
    callBack: () => void;
}

const CardTable = ( props: ICardTableProps ) => {
    const { title, callBack, available } = props
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
                                <View style={[ CardTableStyle.viewContainer, ( available ? CardTableStyle.viewAvailable : CardTableStyle.viewOcuped ) ]}/>
                                <View>
                                    <Text style={[BaseStyles.textTitleH2, { padding: 0, margin: 0 }]}>
                                        { title }
                                    </Text>
                                    <Text style={[BaseStyles.textP, ( available ? CardTableStyle.textAvailable : CardTableStyle.textOcuped ) ]}>
                                        Disponible
                                    </Text>
                                </View>
                            </View>
                            <Text style={[BaseStyles.textP, { textAlign: 'center' }]}>
                                Mesa para 4 personas
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