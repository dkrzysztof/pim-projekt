using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.Note.Response
{
    public class GetSortedNotesResponse
    {
        public string PeriodValue { get; set; }
        public DateTime? PeriodEnd { get; set; }
        public List<PreviewNoteResponse> Notes { get; set; }
    }
}
