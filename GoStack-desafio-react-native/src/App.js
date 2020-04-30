import React, {useState, useEffect} from "react";
import api from './services/api';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";



export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  } , []);

  async function handleLikeRepository(id) {

    const response = await api.post(`repositories/${id}/like`);

    const likes = response.data.likes;

    const newrepo = repositories.map( repository => {
      if(repository.id === id){
        return {...repository, likes};
      }else{
        return repository;
      }
    });

    setRepositories(newrepo);
 
/*
    const response = await api.get('repositories');
    setRepositories(response.data);
*/
  }
  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories} 
          keyExtractor={repository => repository.id} 
          renderItem={({item: repository}) =>(
          <>
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repository.title}</Text>
            <View style={styles.techsContainer}>
              {/*repository.techs.map(tech => (
                <Text key={tech} style={styles.tech}>
                {tech}
              </Text>
              ))*/}
              <FlatList 
                data={repository.techs}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item: tech}) => (
                
                  <Text style={styles.tech}>
                    {tech}
                  </Text>
                
                )}
              >
              </FlatList>
            </View>
              
            

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${repository.id}`}
              >
                {repository.likes} curtidas
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={() => handleLikeRepository(repository.id)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-${repository.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
          </>
        )}>
          
        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: 'center'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'center'
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    
    
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: 'center'
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#363636",
    padding: 15,
    borderRadius: 20,
    width: 250,
    textAlign: 'center',
  },
});
