import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AnaliticItem } from '../component/AnaliticItem';

export function AnaliticPage() {
    const[data, setData] = React.useState({
        "data":  {
          "data":  [
            {
              "name": "Нап.П.БР.БУС! газ.0.45",
              "price": "59.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
            {
              "name": "Нан.ПОУЗИ РЕКИН.г аз.О,",
              "price": "59.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
            {
              "name": "Напиток РЕП ВОН энвр.ж/6 0.25",
              "price": "69.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
            {
              "name": "Сидр СТРОНГЬОУ сл.газ.4.5% О",
              "price": "54.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
            {
              "name": "Сидр 50Ю5ВУ слад .газ .ст/б",
              "price": "49.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
            {
              "name": "Салат ОЛИВЬЕ 1кг",
              "price": "108.42",
              "quantity": "0.302",
              "type_of_product": "Салаты",
            },
            {
              "name": "Салаг МЕНЮ МЯСОЕДА 1КГ",
              "price": "181.74",
              "quantity": "0.260",
              "type_of_product": "Салаты",
            },
            {
              "name": "Печен.СОРЕМСАСЕИ ж/б 454г",
              "price": "599.00",
              "quantity": "1",
              "type_of_product": "Хлеб. изд.",
            },
            {
              "name": "Вода пиг.н/г ПЭТ 1.5",
              "price": "35.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
            {
              "name": "Ниабатта сырная 1кг",
              "price": "107.04",
              "quantity": "0.358",
              "type_of_product": "Хлеб. изд.",
            },
            {
              "name": "Сухар.ГРЕНКИ вк.адж.13",
              "price": "49.90",
              "quantity": "1",
              "type_of_product": "Снэки",
            },
            {
              "name": "СУХДР.ГРЕНКИ вк.адж.13",
              "price": "49.90",
              "quantity": "1",
              "type_of_product": "Снэки",
            },
            {
              "name": "Оливки 80М00Е1ЕЕ 6/косточкиЗ",
              "price": "129.90",
              "quantity": "1",
              "type_of_product": "Консервы",
            },
            {
              "name": "Огур.хрусгяш.ст/6 ?20м",
              "price": "119.90",
              "quantity": "1",
              "type_of_product": "Овощи",
            },
            {
              "name": "Нап.П.БР.БУС! газ.0.45",
              "price": "59.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
            {
              "name": "Нап.П.БР.БУС! газ.0.45",
              "price": "59.90",
              "quantity": "1",
              "type_of_product": "Напитки",
            },
          ],
          "date": "2021-04-29T03:50:12Z",
          "sum": "1796.10",
        },
      })

    const ret = () => {
        var arr = []
        var da = data.data.data
        for(i in da){
            arr.push(da[i].type_of_product)
            
        }
        
        arr = new Set(arr)
        arr = [...arr]
        console.log(arr)
        var arr_dict = []
        for(var i in arr){
            var s = 0
            for(var y in da){
                if (da[y].type_of_product==arr[i]){
                    s+=parseFloat(da[y].price)
                    console.log(s)
                }
            }
            arr_dict.push({'name': arr[i], 'sum': s.toFixed(2)})
        }
        console.log(arr_dict)

        var summ_dict = 0
            for(var i in arr_dict){
                summ_dict+=parseFloat(arr_dict[i].sum)
            }
        summ_dict =summ_dict.toFixed(2)

        return(
            <View>
                <View style={styles.constainerTitle}>
                    <Text>Тип продукта:</Text>
                    <Text> Сумма:</Text>
                </View>
                <View>
                    <FlatList
                    data={arr_dict}
                    renderItem={({item}) => {
                        return  <AnaliticItem data={item}/>
                    }}
                    keyExtractor={item => item.name}
                    />
                </View>
                <View style={styles.constainerTitle}>
                    <Text>Сумма:</Text>
                    <Text>{summ_dict}</Text>
                </View>
            </View>
        )
    }

    return (
        ret()
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    constainerTitle:{
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 18,
        justifyContent: "space-around"
    }
});