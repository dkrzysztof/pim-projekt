using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Note.Response
{
    public class GetAllSortedNotesResponse
    {
        public List<GetSortedNotesResponse> SortedNotesResponses { get; set; }
    }
}
