import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FormButton } from '../component/FormButton';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { sleep } from '../untils/sleep';
import { Loading } from '../component/Loading';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { RenderInputsFields } from '../component/RenderInputsFields';
import { Heading } from '../component/Heading';
import {BASE_URL} from '../config/index'
import { set } from 'react-native-reanimated';
import axios from 'axios'
import { Input } from '../component/Input';



export function MainPage() {
    const camera = React.useRef(null)
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [selectedPhoto, setSelectedPhoto] = React.useState(null);
    const [selectedCamera, setSelectedCamera] = React.useState(null);
    const [selectedProcessing, setSelectedProcessing] = React.useState(null);
    const [listData, setListData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [sumI, setSumI] = React.useState(0);
    const [date, setDate] = React.useState('29.04.2021');
    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);


    let deleteItem = (index) => {
        const arr = [...listData]
        arr.splice(index, 1)
        setListData(arr)
        sumItem()
    }
    let setTypeProduct = (index, word) => {
        const arr = [...listData]
        arr[index].type_of_product = word
        setListData(arr)
        sumItem()
    }
    let setTypeName = (index, word) => {
        const arr = [...listData]
        arr[index].name = word
        setListData(arr)
        sumItem()
    }
    let setTypeQuantity = (index, word) => {
        const arr = [...listData]
        arr[index].quantity = word
        setListData(arr)
        sumItem()
    }
    let setTypePrice = (index, word) => {
        const arr = [...listData]
        arr[index].price = word
        setListData(arr)
        sumItem()
    }
    let sumItem = () =>{
        const arr = [...listData]
        if (arr.length==0){
            setSumI(1936.10)
        } else{
            let s=0
            for (it in arr){
                s+=parseFloat(listData[it].price)
            }
            setSumI(s.toFixed(2))
        }
    }
    let addItem = () =>{
        const arr = [...listData]
        arr.push({"type_of_product":"","name":"","quantity":"0","price":"0"})
        setListData(arr)
    }
    // React.useEffect(() => {
    //     (async () => {
            
    //       for (i in [...listData]){

    //       }
          
    //     })();
    //   }, []);

    let saveCheck = async () => {
        axios.post(
            BASE_URL+'product/save-check/', {
                data:{
                    products: listData,
                    sum: sumI,
                    date: date
                }
            }
        )
    }

    let launchImageLibrary = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
          return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
      };

    let openImagePickerAsync = async () => {
        if (camera.current !== null) {
            // setLoading(true);
            let photo = await camera.current.takePictureAsync({
                base64: true,
                skipProcessing: true,
            });
            setSelectedImage({localUri: photo.uri});
            // setSelectedPhoto(photo);
            setSelectedCamera(null);
            setLoading(null);
        }
    }

    if (loading==true){
        return <Loading loading={loading}/>
    }

    let processingPhoto = async () => {
        setSelectedProcessing(true);
        console.log(typeof(selectedPhoto))
        setLoading(true)
        // let uploadData = new FormData()
        // uploadData.append('photo',{type: 'iamge/jpg', uri: selectedImage.localUri, name: 'photo.jpg'})
        const {data} = await axios({
            method: 'post',
            url: BASE_URL+'product/photo-processing/',
            data: {
                'photo': ''
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            }})
            sleep(4000).then(()=>{
                    setListData(data.data)
                    sumItem()
                    setLoading(null)
                })
    }

    if (selectedProcessing) {
        return(
        <View>
            <View style={styles.title}>
                <Heading style={{fontSize: 20}}>
                    Подробности чека
                </Heading>
                <FormButton title={'Добавить'} style={{width: 200, height:40}} onPress={()=>{
                        addItem()
                    }}/>
            </View>
            <View style={styles.titleContainer}>
                <Text>Тип</Text>
                <Text>Название</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{paddingRight: 10}}>Кол-во</Text>
                    <Text>Цена</Text>
                </View>
            </View>
                <FlatList
                style={{height: '55%'}}
                data={listData}
                renderItem={({item, index}) => {
                    return <RenderInputsFields data={item} index={index} handleDelete={()=> deleteItem(index)} 
                    setTypeProduct={(index, word)=>setTypeProduct(index, word)}
                    setTypeName={(index, word)=>setTypeName(index, word)}
                    setTypeQuantity={(index, word)=>setTypeQuantity(index, word)}
                    setTypePrice={(index, word)=>setTypePrice(index, word)}
                    />
                }}
                keyExtractor={(item, index) => item.name+index}
                />
            <View >
                <View style={styles.date}>
                    <View>
                        <Input placeholder={'Дата'} style={{height: 40, width: 150}} value={date} onChangeText={setDate}></Input>
                    </View>
                    <Text style={{fontSize: 15}}>Сумма: {sumI}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <FormButton title={'Отмена'} style={styles.buttons} onPress={()=>{
                        setSelectedProcessing(null)
                    }}/>
                    <FormButton title={'Сохранить'} style={styles.buttons} onPress={()=>{
                        saveCheck()
                        alert('Чек сохранен')
                        setSelectedProcessing(null)
                    }}/>
                </View>
            </View>
        </View>
        )
    }

    if (selectedCamera !== null){
        return (
            <View style={styles.cameraContainer}>
                <Camera style={styles.camera} type={'back'} ref={camera}>
                <View style={styles.buttonsContainer}>
                    <FormButton title={'Назад'} style={styles.buttonTakePhoto} onPress={()=> setSelectedCamera(null)} />
                    <FormButton title={'Сделать фото'} style={styles.buttonTakePhoto} onPress={()=> {openImagePickerAsync()}}/>
                </View>
                </Camera>
                {/* <Loading loading={loading}/> */}
            </View>
        )
    }


    if (selectedImage !== null) {
    return (
        <View style={styles.container}>
        <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
        />
        <View style={styles.buttonContainer}>
            <FormButton title={'Отмена'} style={styles.button} onPress={()=>{
                setSelectedImage(null)

            }}/>
            <FormButton title={'Далее'} style={styles.button} onPress={()=>{
                setSelectedImage(null)
                processingPhoto()
            }}/>
        </View>
        </View>
    );
    }

    return (
        <View style={styles.container}>
            <Text>Ввод данных с чека.</Text>
            <FormButton title={'Сделать фото'} style={styles.box} onPress={()=> {setSelectedCamera(false)}}/>
            <FormButton title={'Загрузить фото'} style={styles.box} onPress={launchImageLibrary}/>
        
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
        marginVertical:15,
        width: 200,
        height: 65
    },
    container:{
        flex: 1,
        paddingTop: 30,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    takePhoto:{
        width: 200,
        height: 45
    },
    thumbnail: {
        width: 400,
        height: 450,
        resizeMode: "contain"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        paddingHorizontal: 25,
        paddingTop: 10,
    },
    button: {
        width: 140,
        height: 50,
    },
    buttons: {
        width: 140,
        height: 40,
    },
    buttonTakePhoto: {
        width: 150,
        height: 50,
    },
    cameraContainer: {
        flex:1,
        height: 5,
    },
    camera: {
        flex:1,
        height: 5,
        width: '100%'
    },
    buttonsContainer:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: "space-between",
        marginTop: '145%'
    },
    titleContainer:{
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 12
    },
    title:{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 18,
    },
    date:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:5,
        paddingHorizontal: 20
    }
});