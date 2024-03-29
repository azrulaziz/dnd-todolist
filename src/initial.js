export const initial = {
    tasks: [
        {
            id: 0,
            text: 'Write a cool JS library',
            status : 0,
            order : 0
        },
        {
            id: 1,
            text: 'Make it generic enough',
            status : 0,
            order : 1        
        },
        {
            id: 2,
            text: 'Write README',
            status : 1,
            order : 0        
        },
        {
            id: 3,
            text: 'Create some examples',
            status : 1,
            order : 1        
        },
        {
            id: 4,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            status : 2,
            order : 0        
        }, 
        {
            id: 5,
            text: '???',
            status : 2,
            order : 1        
        }, 
        {
            id: 6,
            text: 'PROFIT',
            status : 2,
            order : 2        
        }
    ],
    columns: {
        pending: {
            id: 'col-1',
            title: 'Pending',
            tasks: [4, 5]
        },
        inprogress: {
            id: 'col-2',
            title: 'In Progress',
            tasks: [6]
        },
        done: {
            id: 'col-1',
            title: 'done',
            tasks: [0, 1, 2]
        }
    }
}
