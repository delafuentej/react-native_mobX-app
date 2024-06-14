import React, { useState } from 'react';
import { ListText, Title } from '../style/text';
import { Container, RowContainer } from '../style/container';
import { Input } from '../style/input';
import { Button } from '../style/button';
import { superheroStore } from '../store/superheroes';
import { ListSeparator } from '../style/separator';
import { FlatList } from 'react-native';
import { Observer } from 'mobx-react';


export default Home = ({ navigation }) => {

	// const [superheroList, setHeroList] = useState([]);=> store/superheroes.js
	const [name, setName] = useState('');
	const [power, setPower] = useState('');


    const isFormValid = name.trim.length >2 && power.trim().length>4;

	// addHero = () => {
	// 	setHeroList(list => [...list, { name, power, id: Math.random() }])
	// }

	return (
		<Container>
			<Title>Superheroes</Title>
			<Input
				hint='Name'
				onChangeText={text => setName(text)}
			/>
			<Input
				hint='Power'
				onChangeText={text => setPower(text)}
			/>
			<RowContainer>
				<Button
					title="Add"
					onPress={()=>superheroStore.addHero({name, power})}
					marginRight={12}
                    disabled={!isFormValid}
				/>
				<Button
					title="View List"
					onPress={() => navigation.navigate('List', {
						list: superheroStore.superheroes,
					})}
				/>
			</RowContainer>
            <Observer>{
                ()=><FlatList
                data={superheroStore.superheroes}
                keyExtractor={(item) => item.id}
                style={{ width: '100%', marginTop: 20, paddingBottom: 10 }}
                ItemSeparatorComponent={() => <ListSeparator />}
                renderItem={({ item }) => (
                    <ListText
                        content={`Name: ${item.name}`}
                        onLongPress={() => superheroStore.deleteHero(item.id)}
                        description={`Power: ${item.power}`}
                    />
                )}
            />
                }
                

            </Observer>
          
		</Container>
	);
}