import React, { useState } from 'react';
import { CheeatahListText, Title } from '../style/text';
import { Container, RowContainer } from '../style/container';
import { Input } from '../style/input';
import { Button } from '../style/button';
import { superheroStore } from '../store/superheroes';
import { ListSeparator } from '../style/separator';
import { FlatList } from 'react-native';
import { observer } from 'mobx-react';

export default Home = observer(({ navigation }) => {

	// const [superheroList, setHeroList] = useState([]);=> store/superheroes.js
	const [name, setName] = useState('');
	const [power, setPower] = useState('');

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
				/>
				<Button
					title="View List"
					onPress={() => navigation.navigate('List', {
						list: superheroStore.superheroes,
					})}
				/>
			</RowContainer>
            <FlatList
				data={superheroStore.superheroes}
				keyExtractor={(item) => item.id}
				style={{ width: '100%', marginTop: 20, paddingBottom: 10 }}
				ItemSeparatorComponent={() => <ListSeparator />}
				renderItem={({ item }) => (
					<CheeatahListText
						content={`Name: ${item.name}`}
						onLongPress={() => superheroStore.deleteHero(item.id)}
						description={`Power: ${item.power}`}
					/>
				)}
			/>
		</Container>
	);
})