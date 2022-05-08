import { ArrowLeft } from 'phosphor-react-native'
import React, { useState } from 'react'
import { theme } from '../../theme'
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import { FeedbackType } from '../Widget'
import { styles } from './styles'
import { ScreenshotButton } from '../ScreenshotButton'
import { Button } from '../Button'
import * as FileSystem from 'expo-file-system'
interface Props {
    feedbackType: FeedbackType
    onFeedbackCanceled: () => void
    onFeedbackSent: () => void
}
import { captureScreen } from 'react-native-view-shot'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Copyright } from '../Copyright'
import { api } from '../../libs/api'

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent}: Props){
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [comment, setComment] = useState("")

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(uri => setScreenshot(uri)).catch(error => console.error(error))
    }

    function handleScreenshotRemove() {  
        setScreenshot(null)
    }

    async function handleSendFeedback() {
        if(isSendingFeedback) {
            return;
        }
        setIsSendingFeedback(true)
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64'})

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            })

            onFeedbackSent()
            
        } catch (error) {
            
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onFeedbackCanceled}>
                        <ArrowLeft 
                            size={24}
                            weight="bold"
                            color={theme.colors.text_secondary}
                        />
                    </TouchableOpacity>
    
                    <View style={styles.titleContainer}>
                        <Image
                            source={feedbackTypeInfo.image}
                            style={styles.image} 
                        />
                        <Text style={styles.titleText}>
                            {feedbackTypeInfo.title}
                        </Text>
                    </View>
                </View>
    
                <TextInput
                    multiline
                    style={styles.input}
                    onChangeText={setComment}
                    placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                    placeholderTextColor={theme.colors.text_secondary}
                />
    
                <View style={styles.footer}>
                    <ScreenshotButton
                        onTakeShot={handleScreenshot}
                        onRemoveShot={handleScreenshotRemove}
                        screenShot={screenshot}
                    />
                    <Button 
                        onPress={handleSendFeedback}
                        isLoading={isSendingFeedback}
                    />
                </View>
    
                
    
    
            </View>
            <Copyright />
        </>        
    )
}