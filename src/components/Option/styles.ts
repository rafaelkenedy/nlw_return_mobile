import { StyleSheet } from 'react-native'
import { theme } from '../../theme'
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const styles = StyleSheet.create({
  container: {
    width: windowWidth / 3.95,   
    height: 112,
    alignItems: 'center',
    justifyContent:  'center',
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: theme.colors.surface_secondary
  },
  
  image: {
    width: 40,
    height: 40,
    
  },
  title: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary
  }
})