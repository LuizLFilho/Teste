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
        const recadoId = doc.id;
        
        const li = document.createElement('li');
        li.textContent = `Recado: ${recado.nome} (ID: ${recadoId.substring(0, 4)}...) `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', () => {
            excluirRecado(recadoId);
        });

        li.appendChild(deleteBtn);
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
    recadosRef.get()
        .then((snapshot) => {

            const promises = [];
            
            snapshot.forEach((doc) => {
                promises.push(doc.ref.delete());
            });

            return Promise.all(promises);
        })
        .then(() => {
            console.log("Todos os recados foram apagados com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao apagar todos os recados: ", error);
        });
});


function excluirRecado(idDoDocumento) {

    const documentoParaDeletar = db.collection("recados").doc(idDoDocumento);
    
    documentoParaDeletar.delete()
        .then(() => {
            console.log(`Documento com ID ${idDoDocumento} apagado com sucesso!`);
            // Não precisamos recarregar a lista, pois o onSnapshot fará isso automaticamente.
        })
        .catch((error) => {
            console.error("Erro ao apagar o recado: ", error);
        });
}
