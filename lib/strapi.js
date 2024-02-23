export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`);
  const data = await response.json();

  const res = {};

  data.data.forEach(
    ({ id, attributes: { title, content, slug, updatedAt } }) => {
      res[slug] = JSON.stringify({
        title,
        content,
        updateTime: updatedAt,
      });
    }
  );
  return res
}


export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer a1815f4186a9a34d5c76c24409c8e148a3cc68e61fa469e4cb5c43ec29dbb55ea14875e89b5d1623560d25df2370e37ce494a3da716e821a49cab8e8751293750d54edd1daf5a0565a5eb399a9ae63be6fa68129bbdbbece900e2c8ee3b4e024790635c67266fa16fe5851a416c6340f757c0f81ff1ad654bc47c093e5d4ecc9',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json();
  return res.data.attributes.slug
}


export async function updateNote(uuid, data) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'bearer a1815f4186a9a34d5c76c24409c8e148a3cc68e61fa469e4cb5c43ec29dbb55ea14875e89b5d1623560d25df2370e37ce494a3da716e821a49cab8e8751293750d54edd1daf5a0565a5eb399a9ae63be6fa68129bbdbbece900e2c8ee3b4e024790635c67266fa16fe5851a416c6340f757c0f81ff1ad654bc47c093e5d4ecc9',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json()
}

export async function getNote(uuid) {
  const response = await fetch(`http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`)
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id
  }
}


export async function delNote(uuid) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'bearer a1815f4186a9a34d5c76c24409c8e148a3cc68e61fa469e4cb5c43ec29dbb55ea14875e89b5d1623560d25df2370e37ce494a3da716e821a49cab8e8751293750d54edd1daf5a0565a5eb399a9ae63be6fa68129bbdbbece900e2c8ee3b4e024790635c67266fa16fe5851a416c6340f757c0f81ff1ad654bc47c093e5d4ecc9',
      "Content-Type": "application/json"
    }
  })
  const res = await response.json()
}