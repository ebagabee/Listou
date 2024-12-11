import {
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <View className="h-full w-full flex-col justify-between items-center bg-white">
      {/* Título e descrição */}
      <View className="flex-col w-full items-center justify-center mt-10">
        <Text className="text-center font-bold text-3xl">Crie sua</Text>

        <Text className="text-center text-orange-400 font-bold text-3xl">
          Lista de Compras
        </Text>

        <Text className="text-center text-xl w-2/3 mt-8">
          Com o <Text className="font-bold italic">Listou</Text> Você pode criar
          e organizar suas compras com{" "}
          <Text className="text-orange-400">facilidade</Text>
        </Text>
      </View>

      {/* Container central com imagem de fundo */}
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        className="w-full h-2/3 flex-row items-center justify-center bg-center rounded-lg overflow-hidden mt-5"
      >
        {/* Quadrado cinza opaco */}
        <View className="w-2/3 h-2/4 bg-slate-700 opacity-80 rounded-lg flex items-center justify-center"></View>
      </ImageBackground>

      {/* Botão para criar lista */}
      <TouchableOpacity className="bg-orange-400 px-6 py-3 rounded-lg mb-10">
        <Text className="text-white font-bold text-lg">Criar Lista</Text>
      </TouchableOpacity>
    </View>
  );
}
