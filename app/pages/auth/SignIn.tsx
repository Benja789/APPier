import { Text, View, TextInput, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context"

// Componentes
import Button from "../../components/Base/Button";
import LabelButton from "../../components/Base/LabelButton";

// Estilos
import { BaseStyles } from "../../styles/BaseStyles";
import { SignInStyle } from "../../styles/pages/SignInStyle";

const SignIn = () => {
    const navigation = useNavigation<any>();

    const loginApp = () => {
        navigation.navigate('Home', { screen: 'ListTable' });
    }
    return (
        <SafeAreaView style={[ BaseStyles.safeArea ]}>
            <View style={ BaseStyles.body }>
                <Image 
                    style={[ SignInStyle.iconLogo ]}
                    source={require("../../assets/img/White-Circle-Legends.png")}/>
                <View style={[ BaseStyles.cardContainer, SignInStyle.formsCode ]}>
                    <View style={[BaseStyles.cardContent ]}>
                        <Text style={[BaseStyles.textTitleH1, SignInStyle.text ]}>
                            Ingresa tu código
                        </Text>
                        <TextInput
                            keyboardType="numeric"
                            style={[ BaseStyles.inputText, SignInStyle.inputCode ]}/>
                    </View>
                    <View style={[ BaseStyles.cardAction ]}>
                        <Button 
                            text="Iniciar sesión" 
                            buttonStyle={{ width: '85%' }}
                            callBack={loginApp}/>
                    </View>
                </View>
                <View style={SignInStyle.footer}>
                    <LabelButton 
                        textAnswer=""
                        textButton="Contactar a soporte tecnico"
                        callBack={()=>{}}
                        styleAnswer={{ textAlign: 'center' }}
                        styleButton={{ textAlign: 'center' }}/>
                    <Text style={[ BaseStyles.textP, { textAlign: 'center' }]}>
                        The TecWave
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignIn;