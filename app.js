const firebaseConfig = {
  apiKey: "AIzaSyArguj7gqCRc92MptlNF1W3JLmdZJBb0A",
  authDomain: "testesbanco.firebaseapp.com",
  projectId: "testesbanco",
  storageBucket: "testesbanco.firebasestorage.app",
  messagingSenderId: "5042e2768682",
  appId: "1:504202768682:web:0198c63d28d82896216e53"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const recadosRef = db.collection("recados");
const listaRecados = document.getElementById('listaRecados');


const inputNome = document.getElementById('inputNome');
const btnSalvar = document.getElementById('btnSalvar');
const btnRemover = document.getElementById('btnRemover');
const paragrafo = document.getElementById('paragrafo');


recadosRef.onSnapshot( (snapshot) => {
    listaRecados.innerHTML = '';
    snapshot.forEach( (doc) => {
        const recado = doc.data();
        const li = document.createElement('li');
        li.textContent = `Recado ID: ${doc.id.substring(0, 5)} - Nome: ${recado.nome}`;
        listaRecados.appendChild(li);
    });

}, (error) => {
    console.error("Erro ao carregar os recados: ", error);
});



    btnSalvar.addEventListener('click', () => {
        const nomeDigitado = inputNome.value.trim();

        if (nomeDigitado) {
            recadosRef.add({
                nome: nomeDigitado,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() 
            })
            .then(() => {
                console.log("Recado salvo com ID único!");
                inputNome.value = '';
            })
            .catch((error) => {
                console.error("Erro ao salvar o recado: ", error);
                alert("Não foi possível salvar. Verifique o console.");
            });
        } else {
            alert("Por favor, digite um recado.");
        }
    });


btnRemover.addEventListener('click', () => {
    docRef.delete()
        .then(() => {
            console.log("Documento removido com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao remover o documento: ", error);
            alert("Não foi possível remover os dados. Verifique o console.");
        });
});
