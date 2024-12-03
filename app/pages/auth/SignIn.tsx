import { useContext } from "react";
import { Text, View, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context"
import { AppContextProvider, IContext } from "../../interfaces/IAppContext";

// Componentes
import Button from "../../components/Base/Button";
import LabelButton from "../../components/Base/LabelButton";

// Estilos
import { BaseStyles } from "../../styles/BaseStyles";
import { SignInStyle } from "../../styles/pages/SignInStyle";

const SignIn = () => {
    const navigation = useNavigation<any>();
    const appContext =  useContext(AppContextProvider);

    const loginApp = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'Home',
                    state: {
                        routes: [
                            {
                                name: 'ListTable',
                            }
                        ]
                    }
                }],
            })
        );
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 1 : undefined}>
            <ScrollView style={[BaseStyles.safeArea]}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={BaseStyles.body}>
                        <Image
                            style={[SignInStyle.iconLogo]}
                            source={require("../../assets/img/White-Circle-Legends.png")} />
                        <View style={[BaseStyles.cardContainer, SignInStyle.formsCode, BaseStyles.shadow]}>
                            <View style={[BaseStyles.cardContent]}>
                                <Text style={[BaseStyles.textTitleH1, SignInStyle.text]}>
                                    Ingresa tu código
                                </Text>
                                <TextInput
                                    keyboardType="numeric"
                                    style={[BaseStyles.inputText, SignInStyle.inputCode]} />
                            </View>
                            <View style={[BaseStyles.cardAction]}>
                                <Button
                                    text="Iniciar sesión"
                                    buttonStyle={{ width: '85%' }}
                                    callBack={loginApp} />
                            </View>
                        </View>
                        <View style={SignInStyle.footer}>
                            <LabelButton
                                textAnswer=""
                                textButton="Contactar a soporte tecnico"
                                callBack={() => { }}
                                styleAnswer={{ textAlign: 'center' }}
                                styleButton={{ textAlign: 'center' }} />
                            <Text style={[BaseStyles.textP, { textAlign: 'center' }]}>
                                TecWave - {appContext.settings.appVersion}
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignIn;