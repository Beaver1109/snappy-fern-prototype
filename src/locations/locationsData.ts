export interface Location {
  id: string;
  locId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  hours: string;
  status: 'active' | 'inactive' | 'temp-closed';
  manager: string;
  phone: string;
  openedDate: string;
  region: string;
}

export const mockLocations: Location[] = [
  { id: '1',  locId: 'IB-0001', name: 'Baldwin Park',           address: '4888 E. Garvey Ave',         city: 'Baldwin Park',    state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Maria Gonzalez',    phone: '+1 626 962-9594', openedDate: '1948-10-22', region: 'SoCal'  },
  { id: '2',  locId: 'IB-0012', name: 'Hollywood',              address: '7009 Sunset Blvd',           city: 'Los Angeles',     state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Carlos Rivera',     phone: '+1 213 874-3981', openedDate: '1985-06-14', region: 'SoCal'  },
  { id: '3',  locId: 'IB-0023', name: 'West Hollywood',         address: '8560 Santa Monica Blvd',    city: 'West Hollywood',  state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Jessica Torres',    phone: '+1 310 657-2121', openedDate: '1990-03-08', region: 'SoCal'  },
  { id: '4',  locId: 'IB-0034', name: 'Westwood',               address: '922 Gayley Ave',             city: 'Los Angeles',     state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'David Morales',     phone: '+1 310 208-8671', openedDate: '1992-11-15', region: 'SoCal'  },
  { id: '5',  locId: 'IB-0041', name: 'Santa Monica',           address: '1315 3rd Street Promenade',  city: 'Santa Monica',    state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Sophia Reyes',      phone: '+1 310 393-3383', openedDate: '1995-07-20', region: 'SoCal'  },
  { id: '6',  locId: 'IB-0058', name: 'Mission Valley',         address: '1640 Camino del Rio N',      city: 'San Diego',       state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Marcus Lee',        phone: '+1 619 291-0890', openedDate: '1989-04-12', region: 'SoCal'  },
  { id: '7',  locId: 'IB-0062', name: 'Gaslamp Quarter',        address: '789 W Harbor Dr',            city: 'San Diego',       state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Angela Vega',       phone: '+1 619 232-4449', openedDate: '2001-09-30', region: 'SoCal'  },
  { id: '8',  locId: 'IB-0075', name: 'Pasadena',               address: '245 S Lake Ave',             city: 'Pasadena',        state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Kevin Park',        phone: '+1 626 577-4444', openedDate: '2003-05-17', region: 'SoCal'  },
  { id: '9',  locId: 'IB-0089', name: 'Fisherman\'s Wharf',     address: '333 Jefferson St',           city: 'San Francisco',   state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Priya Sharma',      phone: '+1 415 345-1010', openedDate: '2006-11-01', region: 'NorCal' },
  { id: '10', locId: 'IB-0091', name: 'Fisherman\'s Wharf (2)', address: '749 Beach St',               city: 'San Francisco',   state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'temp-closed', manager: 'Luis Castro',       phone: '+1 415 771-6999', openedDate: '2012-04-28', region: 'NorCal' },
  { id: '11', locId: 'IB-0104', name: 'Oakland Broadway',       address: '3320 Broadway',              city: 'Oakland',         state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Tanya Brooks',      phone: '+1 510 444-1222', openedDate: '2008-08-14', region: 'NorCal' },
  { id: '12', locId: 'IB-0112', name: 'Sacramento Arden',       address: '3608 Arden Way',             city: 'Sacramento',      state: 'CA', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Jason Miller',      phone: '+1 916 485-6666', openedDate: '2010-02-22', region: 'NorCal' },
  { id: '13', locId: 'IB-0128', name: 'The Strip',              address: '4888 Dean Martin Dr',        city: 'Las Vegas',       state: 'NV', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Rachel Kim',        phone: '+1 702 736-0707', openedDate: '1992-02-14', region: 'Nevada' },
  { id: '14', locId: 'IB-0134', name: 'Henderson',              address: '1521 W Warm Springs Rd',     city: 'Henderson',       state: 'NV', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Omar Williams',     phone: '+1 702 990-3050', openedDate: '2005-06-10', region: 'Nevada' },
  { id: '15', locId: 'IB-0145', name: 'Reno South',             address: '2030 S Virginia St',         city: 'Reno',            state: 'NV', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Natalie Holt',      phone: '+1 775 329-2020', openedDate: '2009-10-05', region: 'Nevada' },
  { id: '16', locId: 'IB-0157', name: 'Scottsdale Fashion Sq',  address: '4720 N Scottsdale Rd',       city: 'Scottsdale',      state: 'AZ', country: 'US', timezone: 'MT (UTC-7)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Ben Nakamura',      phone: '+1 480 946-2600', openedDate: '1998-12-01', region: 'Arizona'},
  { id: '17', locId: 'IB-0163', name: 'Tempe University',       address: '1224 E Apache Blvd',         city: 'Tempe',           state: 'AZ', country: 'US', timezone: 'MT (UTC-7)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Aisha Johnson',     phone: '+1 480 829-5555', openedDate: '2002-03-18', region: 'Arizona'},
  { id: '18', locId: 'IB-0172', name: 'Tucson East',            address: '4185 E Speedway Blvd',       city: 'Tucson',          state: 'AZ', country: 'US', timezone: 'MT (UTC-7)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'inactive',    manager: 'Greg Olsen',        phone: '+1 520 327-4411', openedDate: '2007-09-25', region: 'Arizona'},
  { id: '19', locId: 'IB-0181', name: 'Salt Lake City Central', address: '2272 S State St',            city: 'Salt Lake City',  state: 'UT', country: 'US', timezone: 'MT (UTC-7)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Linda Chen',        phone: '+1 801 463-9988', openedDate: '2004-08-30', region: 'Utah'   },
  { id: '20', locId: 'IB-0189', name: 'Provo University Ave',   address: '575 N University Ave',       city: 'Provo',           state: 'UT', country: 'US', timezone: 'MT (UTC-7)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Derek Simmons',     phone: '+1 801 375-0011', openedDate: '2010-11-12', region: 'Utah'   },
  { id: '21', locId: 'IB-0201', name: 'Dallas Uptown',          address: '3888 Oak Lawn Ave',          city: 'Dallas',          state: 'TX', country: 'US', timezone: 'CT (UTC-6)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Monica Davis',      phone: '+1 214 521-4400', openedDate: '2011-04-04', region: 'Texas'  },
  { id: '22', locId: 'IB-0208', name: 'Houston Galleria',       address: '5000 Westheimer Rd',         city: 'Houston',         state: 'TX', country: 'US', timezone: 'CT (UTC-6)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Tyler Watson',      phone: '+1 713 960-8888', openedDate: '2015-02-28', region: 'Texas'  },
  { id: '23', locId: 'IB-0215', name: 'Denver Cherry Creek',    address: '2621 E 2nd Ave',             city: 'Denver',          state: 'CO', country: 'US', timezone: 'MT (UTC-7)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Elena Ruiz',        phone: '+1 720 382-7700', openedDate: '2016-09-09', region: 'Colorado'},
  { id: '24', locId: 'IB-0222', name: 'Portland Pearl District', address: '830 NW 13th Ave',           city: 'Portland',        state: 'OR', country: 'US', timezone: 'PT (UTC-8)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'active',      manager: 'Sam Nakashima',     phone: '+1 503 445-2200', openedDate: '2018-06-21', region: 'Pacific'},
  { id: '25', locId: 'IB-0229', name: 'Boise Towne Square',     address: '350 N Milwaukee St',         city: 'Boise',           state: 'ID', country: 'US', timezone: 'MT (UTC-7)',  hours: 'Sun–Thu 10:30am–1am · Fri–Sat 10:30am–1:30am', status: 'temp-closed', manager: 'Caitlin Ford',       phone: '+1 208 375-9900', openedDate: '2020-03-15', region: 'Pacific'},
];

export const REGIONS = ['SoCal', 'NorCal', 'Nevada', 'Arizona', 'Utah', 'Texas', 'Colorado', 'Pacific'];

export function formatOpenedDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m, 10) - 1]} ${d}, ${y}`;
}
