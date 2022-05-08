import { StyleSheet } from 'react-native'
import { theme } from '../../theme'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    
  },

  title: {
    fontSize: 20,
    marginBottom: 32,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary

  },
  
  options : {
   
    width: '100%',
    marginHorizontal: 24,     
    flexDirection: 'row',
    justifyContent: 'center'
  }
})