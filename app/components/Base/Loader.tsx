import React, { BlurView } from "@react-native-community/blur";
import { useContext } from "react";
import { ActivityIndicator, Modal, StyleSheet } from "react-native"
import { AppContextProvider } from "../../interfaces/IAppContext";

const Loader = ( ) => {
    const context = useContext(AppContextProvider)

    return(
        <Modal visible={context.loader} animationType="slide" transparent={true}>
            <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"/>
                <ActivityIndicator style={styles.centredItem} />
        </Modal>
    )
}


const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    centredItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Loader