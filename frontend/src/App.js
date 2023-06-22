import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [data, setData] = useState();
  const [isAddFormOpen, setIsAddFormOpen] = useState();
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', description: '' });
  const [updateFormValues, setUpdateFormValues] = useState({ title: '', description: '',id:0,creationDate:'' });

  async function getData() {
    const response = await fetch('http://localhost:5000/todos')
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className="App">
        <div className='Header'>
          <div>Todo List</div>

          <a onClick={() => {
            setIsAddFormOpen(!isAddFormOpen)
          }} uk-icon="icon: plus-circle" className='Icon'></a>
        </div>
        <hr />
        {
          isAddFormOpen ?
            <div className='Form'>
              <label className='Label'>
                Title:
              </label>
              <input onChange={(e) => {
                setFormValues({ ...formValues, title: e.target.value })
              }} value={formValues.title} type="text" name="title" />
              <label>
                Description:
              </label>
              <input onChange={(e) => {
                setFormValues({ ...formValues, description: e.target.value })
              }} type="text" value={formValues.description} name="description" />

              <input type="submit" value="Submit" onClick={async () => {
                fetch('http://localhost:5000/todos', {
                  method: 'POST',
                  body: JSON.stringify(formValues),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    window.location.reload(false);
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }} />
            </div>
            : isUpdateFormOpen ?
              <div>
                <div className='FormEdit'>
                  <div className=''>
                    <div >{updateFormValues.title}</div>
                    <div >{updateFormValues.description}</div>
                  </div>
                  <div className='FlexCenter' onClick={async () => {
                    setIsUpdateFormOpen(false);
                    window.location.reload(false);
                  }}>
                    <div>
                      Geri
                    </div>
                    <a uk-icon="icon: triangle-left" className='Icon'></a>
                  </div>

                </div>
                <div className='Form'>
                  <label className='Label'>
                    Title:
                  </label>
                  <input onChange={async (e) => {
                    setUpdateFormValues({ ...updateFormValues, title: e.target.value })
                    const response = await fetch(`http://localhost:5000/todos/${updateFormValues.id}`, {
                      method: 'PUT',
                      body: JSON.stringify({...updateFormValues,title:e.target.value}),
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                    })
                      .then((response) => response.json())
                      .then((data) => {
                      })
                      .catch((err) => {
                        alert(err)
                      });

                  }} value={updateFormValues.title} type="text" name="title" />
                  <label>
                    Description:
                  </label>
                  <input onChange={async (e) => {
                    setUpdateFormValues({ ...updateFormValues, description: e.target.value })
                    const response = await fetch(`http://localhost:5000/todos/${updateFormValues.id}`, {
                      method: 'PUT',
                      body: JSON.stringify({...updateFormValues,description:e.target.value}),
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                    })
                      .then((response) => response.json())
                      .then((data) => {
                      })
                      .catch((err) => {
                       
                      });

                  }} type="text" value={updateFormValues.description} name="description" />

                </div>
              </div>

              : <div>
                {
                  data?.map(item => (
                    <div key={item.id} className='Item'>
                      <div>
                        <div className='Title'>
                          {item.title}
                        </div>
                        <div>
                          {item.description}
                        </div>
                        <div className='CreationText'>
                          {item.creationDate}
                        </div>
                      </div>
                      <div>
                        <a onClick={async () => {
                          setIsUpdateFormOpen(!isUpdateFormOpen)
                          setUpdateFormValues(item)
                        }} uk-icon="icon: file-edit" className='Icon'></a>
                        <a onClick={async () => {
                          const response = await fetch('http://localhost:5000/todos/' + item.id, {
                            method: "DELETE"
                          })
                          window.location.reload(false);
                        }} uk-icon="icon: trash" className='Icon'></a>
                      </div>
                    </div>
                  ))
                }
              </div>
        }
      </div>

    </>
  );
}

export default App;
